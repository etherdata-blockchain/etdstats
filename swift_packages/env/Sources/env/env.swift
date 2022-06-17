import Foundation

public struct CheckResult {
    public var isNotMissing: Bool
    public var missingKeys: [String]
}

/**
 Check Environment variables do exist.
 */
public class EnvChecker {
    let envs: [String]

    /**
     Initialize env checker with list of environments
     - Parameter envs: A list of environment variable keys
     */
    public init(envs: [String]) {
        self.envs = envs
    }

    /**
     Check environment variable exist
     - Returns:
     */
    public func check() -> CheckResult {
        var isNotMissing = true
        var missingKeys: [String] = []
        for env in envs{
            if ProcessInfo.processInfo.environment[env] == nil {
                isNotMissing = false
                missingKeys.append(env)
            }
        }
        return CheckResult(isNotMissing: isNotMissing, missingKeys: missingKeys)
    }
}
